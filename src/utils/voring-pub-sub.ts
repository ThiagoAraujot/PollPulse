type Message = { pollOptionId: string; votes: number };
type Subsriber = (message: Message) => void;

class VotingPubSub {
  private channels: Record<string, Subsriber[]> = {};

  subscribe(pollId: string, subscriber: Subsriber) {
    if (!this.channels[pollId]) {
      this.channels[pollId] = [];
    }

    this.channels[pollId].push(subscriber);
  }

  publish(pollId: string, message: Message) {
    if (!this.channels[pollId]) {
      return;
    }

    for (const subscriber of this.channels[pollId]) {
      subscriber(message);
    }
  }
}

export const voting = new VotingPubSub();
