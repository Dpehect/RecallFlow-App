import { ReadingStory } from "./data";
import rawStories from "./reading_data.json";

export const GENERATED_READING_STORIES: ReadingStory[] = rawStories as unknown as ReadingStory[];
