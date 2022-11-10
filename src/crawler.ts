import fs from 'fs';
import path from 'path';
import superagent from 'superagent';
import DellAnalyzer from './dellAnalyzer';

interface CourseResult {
  time: number;
  data: Course[];
}

interface Content {
  [propName: number]: Course[];
}

class Crawler {
  private secret = 'secretKey';
  private url = `http://www.dell-lee.com/typescript/demo.html?secret=${this.secret}`;
  private filePath = path.resolve(__dirname, '../data/course.json');

  async getRawHtml() {
    const result = await superagent.get(this.url);
    return result.text;
  }

  writeFile(fileContent: Content) {
    fs.writeFileSync(this.filePath, JSON.stringify(fileContent));
  }

  async initSpiderProcess() {
    const html = await this.getRawHtml();
    const fileContent = this.analyzer().analyze(html);
    this.writeFile(fileContent);
  }

  constructor(private analyzer: any) {
    this.initSpiderProcess();
  }
}

const analyzer = new DellAnalyzer();
const crawler = new Crawler(analyzer);
