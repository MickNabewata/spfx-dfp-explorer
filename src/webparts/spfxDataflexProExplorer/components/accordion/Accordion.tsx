import * as React from 'react';
import styles from './Accordion.module.scss';
import { isEmpty } from '@microsoft/sp-lodash-subset';
import { Accordion as OriginalAccordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import ExpandMore from '@material-ui/icons/ExpandMore';

/** アコーディオンコンポーネント プロパティ */
export interface IAccordionProps {
  /** タイトル */
  title: string;
  /** 子コンポーネント */
  children?: React.ReactNode;
  /** クラス名 */
  className?: string;
  /** キー */
  key?: string;
}

/** アコーディオンコンポーネント */
export default function Accordion(props: IAccordionProps): JSX.Element {
  return (
    <OriginalAccordion className={`${!isEmpty(props.className) ? `${props.className} ` : ''}${styles.accordion}`} key={props.key}>
      <AccordionSummary expandIcon={<ExpandMore />} className={styles.summary}>{props.title}</AccordionSummary>
      <AccordionDetails>
        {props.children}
      </AccordionDetails>
    </OriginalAccordion>
  );
}