import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'countries' })
export class Country {
   @PrimaryColumn({ length: 3 })
   code: string;

   @Column({ unique: true, nullable: false })
   name: string;
}
