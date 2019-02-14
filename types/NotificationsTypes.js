// @flow
export type Notification = {
  +id: string,
  +content: string,
  +authorId: string,
  +user: string
};

export type Notifications = Array<Notification>;