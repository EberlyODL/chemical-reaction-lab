import { observable } from 'mobx';

export const store = observable({
  video: {
    videoId: null,
    status: "off"
  }
});