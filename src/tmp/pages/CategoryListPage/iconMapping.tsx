import { IconType } from 'react-icons';
import { GiConverseShoe } from 'react-icons/gi';
import { MdOutlineDevices, MdOutlineChair, MdMoreHoriz } from 'react-icons/md';

export const iconMapping: { [key: string]: IconType } = {
  Electronics: MdOutlineDevices,
  Furniture: MdOutlineChair,
  Shoes: GiConverseShoe,
  Miscellaneous: MdMoreHoriz,
};
