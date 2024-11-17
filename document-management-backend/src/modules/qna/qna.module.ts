import { Module } from '@nestjs/common';
import { QnaController } from 'src/controllers/qna/qna.controller';
import { QnaService } from 'src/services/qna/qna.service';
import { PDFDocumentLoader } from 'src/strategies/document-loader/pdf-document-loader';
import { RecursiveSplitter } from 'src/strategies/document-splitter/recursive-splitter';
import { HuggingFaceRetriever } from 'src/strategies/retriever/huggingface-retriever';
import { DefaultPromptTemplate } from 'src/strategies/prompt-template/default-prompt-template';
import { GoogleGenerativeAIModel } from 'src/strategies/llm/google-generative-ai-model';

@Module({
  controllers: [QnaController],
  providers: [
    {
      provide: 'DocumentLoaderStrategy',
      useClass: PDFDocumentLoader,
    },
    {
      provide: 'DocumentSplitterStrategy',
      useClass: RecursiveSplitter,
    },
    {
      provide: 'RetrieverStrategy',
      useClass: HuggingFaceRetriever,
    },
    {
      provide: 'PromptTemplateStrategy',
      useClass: DefaultPromptTemplate,
    },
    {
      provide: 'ModelStrategy',
      useClass: GoogleGenerativeAIModel,
    },
    QnaService,
  ],
})
export class QnaModule {}
