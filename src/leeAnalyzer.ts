import { Analyzer } from './crawler';

export default class LeeAnalyzer implements Analyzer {
  public analyze(html: string, filePath: string) {
    return html;
  }
}
