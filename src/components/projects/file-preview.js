import React from 'react';
import { Document, Page } from 'react-pdf';
import typeStyles from '../../styles/typography.module.css';
import styles from './file-preview.module.css';
import useWindowSize from '../../lib/useWindowSize';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';

export default function FilePreview({ file, caption, title = caption, thumbnail = false }) {
  if (!file || !file.asset || !file.asset.url) {
    return null;
  }

  const { asset } = file;
  const size = useWindowSize();

  // assume PDFs are verical and use max height
  let height = size.height * 0.66;

  if (thumbnail) {
    height = 320;
  }

  if (asset.extension === 'pdf') {
    const onLoadError = (...args) => {
      console.log('PDF Error', [...args]);
    };
    return (
      <section className={styles.previewSection}>
        <Document file={asset.url} onLoadError={onLoadError} className={styles.pdfDocument}>
          <a href={asset.url} title={title} target="_blank">
            <Page pageIndex={0} height={height} />
          </a>
          <h3 className={typeStyles.macro} style={{ marginBottom: 0 }}>
            PDF
          </h3>
          {!thumbnail && (
            <>
              <h4 className={typeStyles.responsiveTitle2}>{title}</h4>
              <a className={typeStyles.responsiveTitle3} href={asset.url} title={title} target="_blank">
                {asset.originalFilename}
                <PictureAsPdfIcon className={styles.pdfIcon} />
              </a>
            </>
          )}
        </Document>
      </section>
    );
  }

  return (
    <section className={styles.previewSection}>
      <h3 className={typeStyles.macro} style={{ marginBottom: '1em' }}>
        <a href={asset.url} title={title} target="_blank">
          Download
        </a>
      </h3>
      {!thumbnail && <h4 className={typeStyles.responsiveTitle2}>{title}</h4>}
      <a className={typeStyles.responsiveTitle3} href={asset.url} title={title} target="_blank">
        {asset.originalFilename}
      </a>
    </section>
  );
}
