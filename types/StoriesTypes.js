// @flow
export type Story = {
  +id: string,
  +authorFirstName: string,
  authorLastName: string,
  +title: string,
  +category: string,
  +img: string,
  +content: string,
  +authorId: string,
};

export type Stories = Array<Story>;

export type StoriesState = {
  +stories: Stories
};

export type StoryState = {
  +story: Story
};