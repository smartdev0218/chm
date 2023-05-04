export class Notification {
  public content: string;
  public class: string;
  public link: string;
  public tooltip: string;
  public text: string;

  public constructor(data: any = {}) {
    this.content = data.content || '';
    this.class = data.class || '';
    this.link = data.link || '';
    this.tooltip = data.tooltip || '';
    this.text = data.text || '';
  }
}
