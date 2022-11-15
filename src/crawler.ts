import fs from 'fs';
import path from 'path';
import superagent from 'superagent';
import LeeAnalyzer from './leeAnalyzer';

export interface Analyzer {
  analyze: (html: string, filePath: string) => string;
}

class Crawler {
  private filePath = path.resolve(__dirname, '../data/course.json');

  async getRawHtml() {
    const result = await superagent.get(this.url);
    return result.text;
  }

  writeFile(fileContent: string) {
    fs.writeFileSync(this.filePath, fileContent);
  }

  async initSpiderProcess() {
    const html = await this.getRawHtml();
    const fileContent = this.analyzer.analyze(html, this.filePath);
    this.writeFile(fileContent);
  }

  constructor(private url: string, private analyzer: Analyzer) {
    this.initSpiderProcess();
  }
}

const secret = 'secretKey';
const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;
const analyzer = new LeeAnalyzer();
new Crawler(url, analyzer);
