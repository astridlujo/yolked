import React from 'react';
import { Switch } from 'react-native-paper';
import { AddSetting, RemoveSetting, GetSettings } from '../scripts/FirebaseFunctions';


export default class SwitchComponent extends React.Component {
  state = {
    isSwitchOn: this.CheckSettings(),
  };

  async CheckSettings() {
    const currSettings = await GetSettings();

    console.log(currSettings);
    if (currSettings.some(e => e === this.props.item)) {
      console.log("Match!");
      this.setState({isSwitchOn:true});
    } else {
      this.setState({isSwitchOn:false});
    }
  }

  UpdateSettings(switchValue) {
    console.log(this.props.item);
    if (switchValue) {
      AddSetting(this.props.item);
    } else {
      console.log("removal!");
      RemoveSetting(this.props.item);
    }
  }

  render() {
    const { isSwitchOn } = this.state;
    return (
      <Switch
        value={isSwitchOn}
        onValueChange={() => {
            this.setState({ isSwitchOn: !isSwitchOn });
            this.UpdateSettings(!isSwitchOn);
          }
        }
      />
    );
  }
}

export { SwitchComponent };
