import { StatisticsCalculator } from '../services/calculator.service';

const INTERVAL = 5 * 60 * 1000;

export class BackgroundJob {
  private intervalId: NodeJS.Timeout | null = null;
  private calculator = new StatisticsCalculator();

  start() {
    this.intervalId = setInterval(async () => {
      await this.calculator.calculateAndUpdate();
    }, INTERVAL);
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}
