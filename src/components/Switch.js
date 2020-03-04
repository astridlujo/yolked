import React from 'react';
import { Switch } from 'react-native-paper';

export default class SwitchComponent extends React.Component {
  state = {
    isSwitchOn: false,
  };

  render() {
    const { isSwitchOn } = this.state;
    return (
      <Switch
        value={isSwitchOn}
        onValueChange={() =>
          { this.setState({ isSwitchOn: !isSwitchOn }); }
        }
      />
    );
  }
}

export { SwitchComponent };