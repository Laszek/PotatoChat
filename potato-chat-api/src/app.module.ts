import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MessagesModule } from './messages/messages.module'
import { AnswersModule } from './answers/answers.module'


@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1:63475/'),MessagesModule, AnswersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
