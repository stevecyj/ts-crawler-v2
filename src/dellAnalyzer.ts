interface Course {
  title: string;
  count: number;
}

import fs from 'fs';
import path from 'path';
import cheerio from 'cheerio';

export default class DellAnalyzer {
  constructor() {}
  private getCourseInfo(html: string) {
    const $ = cheerio.load(html);
    const courseItems = $('.course-item');
    const courseInfos: Course[] = [];

    courseItems.map((index, element) => {
      const descs = $(element).find('.course-desc');
      const title = descs.eq(0).text();
      const count = parseInt(descs.eq(1).text().split('：')[1], 10);
      courseInfos.push({ title, count });
    });

    const result = {
      time: new Date().getTime(),
      data: courseInfos,
    };
    return result;
  }

  generateJsonContent(courseInfo: CourseResult) {
    let fileContent: Content = {};
    if (fs.existsSync(this.filePath)) {
      fileContent = JSON.parse(fs.readFileSync(this.filePath, 'utf-8'));
    }
    fileContent[courseInfo.time] = courseInfo.data;
    return fileContent;
  }

  public analyze(html: string) {
    const courseInfo = this.getCourseInfo(html);
    const fileContent = this.generateJsonContent(courseInfo);
    return fileContent;
  }
}
