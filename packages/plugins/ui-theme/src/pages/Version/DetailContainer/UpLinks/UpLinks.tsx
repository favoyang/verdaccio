import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { formatDateDistance } from 'verdaccio-ui/utils/package';

import { DetailContext } from '../..';
import NoItems from '../NoItems';
import { ListItemText, Spacer, StyledText } from './styles';

const UpLinks: React.FC = () => {
  const { packageMeta } = useContext(DetailContext);
  const { t } = useTranslation();

  if (!packageMeta || !packageMeta._uplinks || !packageMeta.latest) {
    return null;
  }

  const { _uplinks: uplinks, latest } = packageMeta;

  if (Object.keys(uplinks).length === 0) {
    return <NoItems data-testid="no-uplinks" text={t('uplinks.no-items', { name: latest.name })} />;
  }

  return (
    <>
      <StyledText variant="subtitle1">{t('uplinks.title')}</StyledText>
      <List>
        {Object.keys(uplinks)
          .reverse()
          .map((name) => (
            <ListItem key={name}>
              <ListItemText>{name}</ListItemText>
              <Spacer />
              <ListItemText>{formatDateDistance(uplinks[name].fetched)}</ListItemText>
            </ListItem>
          ))}
      </List>
    </>
  );
};

export default UpLinks;
