import React from 'react';
import serializers from './serializers';
import { PortableText } from '@portabletext/react';
const BlockContent = ({ blocks }) => <PortableText value={blocks} components={serializers} />;

export default BlockContent;
