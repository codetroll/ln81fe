export class Version {
    id!: number;
    title!: string;
    version_number!: string;
    start_year!: string;
    end_year!: string;
    description!: string;
    image!: string;
    active!: number;
    chapters: Chapter[];
    deleted_at!: string;
    created_at!: string;
    updated_at!: string;
}