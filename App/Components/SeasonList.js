import React from 'react';
import { Icon, List, ListItem, Text, Button, Grid, Col } from 'native-base';

const SeasonList = ({ showId, showAllocine, seasons, seasonsRefresh }) => {
  const onSeasonsRefresh = () => {
    seasonsRefresh(showId, showAllocine);
  };
  return (
    <List>
      {seasons &&
        Object.keys(seasons).reverse().map(id => (
          <ListItem key={id}>
            <Grid>
              <Col size={38}>
                <Text>{`Season ${id}`}</Text>
                <Text
                  note
                >{`${seasons[id].episodes} ep. in ${seasons[id].year}`}</Text>
              </Col>
              <Col size={62}>
                {/* <Text>Renaud, Sylvain, Papa&Maman</Text> */}
              </Col>
            </Grid>
          </ListItem>
        ))}
      <Button full onPress={onSeasonsRefresh}>
        <Icon name="refresh" />
        <Text>New seasons?</Text>
      </Button>
    </List>
  );
};

export default SeasonList;
