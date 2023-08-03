import type { FC } from 'react';
import { useMemo } from 'react';

import { StyleSheet } from 'react-native';
import RNMarkdown from 'react-native-markdown-display';

import { useIsVerticalLayout, useThemeValue } from '@onekeyhq/components';

import {
  Body1Props,
  Body2Props,
  DisplayMediumProps,
  DisplaySmallProps,
} from '../Typography';

import type { TextStyle } from 'react-native';

// all markdown style
// https://github.com/iamacup/react-native-markdown-display/blob/master/src/lib/styles.js

const Markdown: FC = ({ children }) => {
  const headingColor = useThemeValue('text-default');
  const bodyTextColor = useThemeValue('text-subdued');
  // const bgColor = useThemeValue('surface-default');
  const isSmallScreen = useIsVerticalLayout();
  const horizontalRulesColor = useThemeValue('divider');
  const bg = useThemeValue('background-selected');

  const styles = useMemo(
    () =>
      StyleSheet.create({
        body: {
          color: bodyTextColor,
          lineHeight: 28,
          ...(isSmallScreen
            ? (Body1Props as TextStyle)
            : (Body2Props as TextStyle)),
        },
        paragraph: {
          marginVertical: 4,
        },
        code_inline: {
          paddingVertical: 2,
          paddingHorizontal: 8,
          fontWeight: 700,
        },
        fence: {
          marginVertical: 4,
          paddingVertical: 4,
          paddingHorizontal: 8,
          backgroundColor: bg,
        },
        heading1: {
          marginTop: 12,
          marginBottom: 4,
          color: headingColor,
          ...(DisplayMediumProps as TextStyle),
        },
        heading2: {
          marginTop: 12,
          marginBottom: 4,
          color: headingColor,
          ...(DisplayMediumProps as TextStyle),
        },
        heading3: {
          marginTop: 24,
          marginBottom: 4,
          color: headingColor,
          ...(DisplaySmallProps as TextStyle),
        },
        list_item: {
          lineHeight: 28,
          marginVertical: 4,
          flexDirection: 'row',
        },
        hr: {
          marginTop: 24,
          marginBottom: 12,
          backgroundColor: horizontalRulesColor,
          height: 1,
        },
      }),
    [bg, bodyTextColor, headingColor, horizontalRulesColor, isSmallScreen],
  );

  return (
    <RNMarkdown mergeStyle={false} style={styles}>
      {children}
    </RNMarkdown>
  );
};

export default Markdown;
