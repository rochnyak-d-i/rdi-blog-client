import { RawDraftContentState } from 'draft-js';
import { ITags } from '@components/common/Tags/Tags';

export interface IPostProps {
  label: string,
  description: string,
  content: RawDraftContentState | null,
  tags: ITags
}
