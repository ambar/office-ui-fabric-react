import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Callout, DirectionalHint } from 'office-ui-fabric-react/lib/Callout';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { Slider } from 'office-ui-fabric-react/lib/Slider';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import './CalloutExample.scss';

import * as exampleStylesImport from '../../../common/_exampleStyles.scss';
const exampleStyles: any = exampleStylesImport;

export interface ICalloutDirectionalExampleState {
  isCalloutVisible?: boolean;
  directionalHint?: DirectionalHint;
  isBeakVisible?: boolean;
  gapSpace?: number;
  beakWidth?: number;
}

const DIRECTION_OPTIONS = [
  { key: DirectionalHint.topLeftEdge, text: 'Top Left Edge' },
  { key: DirectionalHint.topCenter, text: 'Top Center' },
  { key: DirectionalHint.topRightEdge, text: 'Top Right Edge' },
  { key: DirectionalHint.topAutoEdge, text: 'Top Auto Edge' },
  { key: DirectionalHint.bottomLeftEdge, text: 'Bottom Left Edge' },
  { key: DirectionalHint.bottomCenter, text: 'Bottom Center' },
  { key: DirectionalHint.bottomRightEdge, text: 'Bottom Right Edge' },
  { key: DirectionalHint.bottomAutoEdge, text: 'Bottom Auto Edge' },
  { key: DirectionalHint.leftTopEdge, text: 'Left Top Edge' },
  { key: DirectionalHint.leftCenter, text: 'Left Center' },
  { key: DirectionalHint.leftBottomEdge, text: 'Left Bottom Edge' },
  { key: DirectionalHint.rightTopEdge, text: 'Right Top Edge' },
  { key: DirectionalHint.rightCenter, text: 'Right Center' },
  { key: DirectionalHint.rightBottomEdge, text: 'Right Bottom Edge' },
];

export class CalloutDirectionalExample extends React.Component<any, ICalloutDirectionalExampleState> {
  private _menuButtonElement: HTMLElement;
  public constructor() {
    super();

    this.state = {
      isCalloutVisible: false,
      isBeakVisible: true,
      directionalHint: DirectionalHint.bottomLeftEdge
    };
  }

  public render() {
    let { isCalloutVisible, isBeakVisible, directionalHint, gapSpace, beakWidth } = this.state;
    //  ms-Callout-smallbeak is used in this directional example to reflect all the positions. Large beak will disable some position to avoid beak over the callout edge.
    return (
      <div className='ms-CalloutExample'>
        <div className='ms-CalloutExample-configArea'>
          <Checkbox
            className={ exampleStyles.exampleCheckbox }
            label='Show beak'
            checked={ isBeakVisible }
            onChange={ this._onShowBeakChange }
          />
          <Slider
            max={ 30 }
            label='Gap Space'
            min={ 0 }
            defaultValue={ 0 }
            onChange={ this._onGapSlider }
          />
          { isBeakVisible &&
            (<Slider
              max={ 50 }
              label='Beak Width'
              min={ 10 }
              defaultValue={ 16 }
              onChange={ this._onBeakWidthSlider }
            />) }
          <Dropdown
            label='Directional hint'
            selectedKey={ directionalHint! }
            options={ DIRECTION_OPTIONS }
            onChanged={ this._onDirectionalChanged }
          />
        </div>
        <div className='ms-CalloutExample-buttonArea' ref={ (menuButton) => this._menuButtonElement = menuButton! }>
          <DefaultButton
            className={ 'calloutExampleButton' }
            onClick={ this._onShowMenuClicked }
            text={ isCalloutVisible ? 'Hide callout' : 'Show callout' }
          />
        </div>
        { isCalloutVisible ? (
          <Callout
            className='ms-CalloutExample-callout'
            gapSpace={ gapSpace }
            target={ this._menuButtonElement }
            isBeakVisible={ isBeakVisible }
            beakWidth={ beakWidth }
            onDismiss={ this._onCalloutDismiss }
            directionalHint={ directionalHint }
          >
            <div className='ms-CalloutExample-header'>
              <p className='ms-CalloutExample-title'>
                All of your favorite people
               </p>
            </div>
            <div className='ms-CalloutExample-inner'>
              <div className='ms-CalloutExample-content'>
                <p className='ms-CalloutExample-subText'>
                  Message body is optional. If help documentation is available, consider adding a link to learn more at the bottom.
                 </p>
              </div>
            </div>
          </Callout>
        ) : (null) }
      </div>
    );
  }

  @autobind
  private _onCalloutDismiss() {
    this.setState({
      isCalloutVisible: false
    });
  }

  @autobind
  private _onShowMenuClicked() {
    this.setState({
      isCalloutVisible: !this.state.isCalloutVisible
    });
  }

  @autobind
  private _onShowBeakChange(ev: React.FormEvent<HTMLElement>, isVisible: boolean) {
    this.setState({
      isBeakVisible: isVisible,
      beakWidth: 10
    });
  }

  @autobind
  private _onDirectionalChanged(option: IDropdownOption) {
    this.setState({
      directionalHint: option.key as number
    });
  }

  @autobind
  private _onGapSlider(value: number) {
    this.setState({
      gapSpace: value
    });
  }

  @autobind
  private _onBeakWidthSlider(value: number) {
    this.setState({
      beakWidth: value
    });
  }
}