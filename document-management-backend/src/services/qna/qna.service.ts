import { Inject, Injectable } from '@nestjs/common';
import { createRetrievalChain } from 'langchain/chains/retrieval';
import { createStuffDocumentsChain } from 'langchain/chains/combine_documents';
import { DocumentLoaderStrategy } from '../../strategies/document-loader/pdf-document-loader';
import { DocumentSplitterStrategy } from '../../strategies/document-splitter/recursive-splitter';
import { RetrieverStrategy } from '../../strategies/retriever/huggingface-retriever';
import { PromptTemplateStrategy } from '../../strategies/prompt-template/default-prompt-template';
import { ModelStrategy } from 'src/strategies/llm/google-generative-ai-model';

@Injectable()
export class QnaService {
    constructor(
        @Inject('DocumentLoaderStrategy') private readonly documentLoader: DocumentLoaderStrategy,
        @Inject('DocumentSplitterStrategy') private readonly documentSplitter: DocumentSplitterStrategy,
        @Inject('RetrieverStrategy') private readonly retrieverStrategy: RetrieverStrategy,
        @Inject('PromptTemplateStrategy') private readonly promptTemplateStrategy: PromptTemplateStrategy,
        @Inject('ModelStrategy') private readonly modelStrategy: ModelStrategy
    ) { }

    async askQuestion(question: string) {
        const docs = await this.documentLoader.loadDocuments('./MTeck_s_Resume-1.pdf');
        const splits = await this.documentSplitter.splitDocuments(docs);
        const retriever = await this.retrieverStrategy.createRetriever(splits);
        const prompt = this.promptTemplateStrategy.createPromptTemplate();
        const model = this.modelStrategy.createModel();

        const questionAnswerChain = await createStuffDocumentsChain({
            llm: model,
            prompt,
        });

        const ragChain = await createRetrievalChain({
            retriever,
            combineDocsChain: questionAnswerChain,
        });

        const results = await ragChain.invoke({
            input: question,
        });

        return results;
    }
}
