import React from 'react';
import { Document, Page } from 'react-pdf';
import { macro, responsiveTitle2, responsiveTitle3 } from '../../styles/typography.module.css';
import { previewSection, pdfDocument, pdfIcon } from './file-preview.module.css';
import useWindowSize from '../../lib/useWindowSize';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';

export default function FilePreview({ file, caption, title = caption, thumbnail = false }) {
  const size = useWindowSize();

  if (!file || !file.asset || !file.asset.url) {
    return null;
  }

  const { asset } = file;

  // assume PDFs are vertical and use max height
  let height = size.height * 0.66;

  if (thumbnail) {
    height = 320;
  }

  if (asset.extension === 'pdf') {
    const onLoadError = (...args) => {
      console.log('PDF Error', [...args]);
    };
    return (
      <section className={previewSection}>
        <Document file={asset.url} onLoadError={onLoadError} className={pdfDocument}>
          <a href={asset.url} title={title} target="_blank">
            <Page pageIndex={0} height={height} />
          </a>
          <h3 className={macro} style={{ marginBottom: 0 }}>
            PDF
          </h3>
          {!thumbnail && (
            <>
              <h4 className={responsiveTitle2}>{title}</h4>
              <a className={responsiveTitle3} href={asset.url} title={title} target="_blank">
                {asset.originalFilename}
                <PictureAsPdfIcon className={pdfIcon} />
              </a>
            </>
          )}
        </Document>
      </section>
    );
  }

  return (
    <section className={previewSection}>
      <h3 className={macro} style={{ marginBottom: '1em' }}>
        <a href={asset.url} title={title} target="_blank">
          Download
        </a>
      </h3>
      {!thumbnail && <h4 className={responsiveTitle2}>{title}</h4>}
      <a className={responsiveTitle3} href={asset.url} title={title} target="_blank">
        {asset.originalFilename}
      </a>
    </section>
  );
}
