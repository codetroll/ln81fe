import { Section } from './section';

export class Chapter {
    id: number;
    author_id: number;
    version_id: number;
    category_id: number;
    title: string;
    subtitle: string;
    image: string;
    sort_order: number;
    active: number;
    sections: Section[];
    deleted_at: string;
    created_at: string;
    updated_at: string;

}
