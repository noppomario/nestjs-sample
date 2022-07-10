import { Injectable } from '@nestjs/common';
import { promises } from 'fs';

const { readFile, writeFile } = promises;

@Injectable()
export class MessagesRepository {
  async findOne(id: string) {
    const contents = await readFile('messages.json', 'utf8');
    const messages = JSON.parse(contents);

    return messages[parseInt(id, 10)];
  }

  async findAll() {
    const contents = await readFile('messages.json', 'utf8');
    const messages = JSON.parse(contents);

    return messages;
  }

  async create(content: string) {
    const contents = await readFile('messages.json', 'utf8');
    const messages = JSON.parse(contents);

    const id = Math.floor(Math.random() * 999);

    // eslint-disable-next-line security/detect-object-injection
    messages[id] = { id, content };

    await writeFile('messages.json', JSON.stringify(messages));
  }
}
