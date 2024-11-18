import { IsString, IsNotEmpty, IsUrl } from 'class-validator';
import { ObjectId } from 'mongodb';

export class CreateDocumentDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsUrl()
  @IsNotEmpty()
  contentUrl: string;

  @IsString()
  @IsNotEmpty()
  contentType: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsNotEmpty()
  userId: ObjectId;
}
