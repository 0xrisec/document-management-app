import { Body, Controller, Post } from '@nestjs/common';
import { QnaService } from 'src/services/qna/qna.service';

@Controller('qna')
export class QnaController {
  constructor(private readonly qnaService: QnaService) {}

  @Post('ask')
  async askQuestion(@Body('question') question: string) {
    const answer = await this.qnaService.askQuestion(question);
    return answer;
  }
}
