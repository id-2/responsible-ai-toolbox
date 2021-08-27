// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { localization } from "@responsible-ai/localization";
import {
  IStackTokens,
  Label,
  Stack,
  Slider,
  Toggle
} from "office-ui-fabric-react";
import React from "react";

import { InfoCallout } from "../InfoCallout/InfoCallout";

import { matrixOptionsStyles } from "./MatrixOptions.styles";

export interface IMatrixOptionsProps {
  quantileBinning: boolean;
  binningThreshold: number;
  isEnabled: boolean;
  updateQuantileBinning: (quantileBinning: boolean) => void;
  updateNumBins: (numBins: number) => void;
}

const stackTokens: IStackTokens = { childrenGap: "l1" };

export class MatrixOptions extends React.Component<IMatrixOptionsProps> {
  private readonly _quantileBinningIconId = "quantileBinningIconId";
  private readonly _binningThresholdIconId = "binningThresholdIconId";

  public render(): React.ReactNode {
    const classNames = matrixOptionsStyles();
    return (
      <Stack horizontal tokens={stackTokens}>
        <Stack.Item className={classNames.toggleStackStyle}>
          <Toggle
            label={
              <div>
                {localization.ErrorAnalysis.MatrixOptions.quantileBinningLabel}
                <InfoCallout
                  iconId={this._quantileBinningIconId}
                  infoText={
                    localization.ErrorAnalysis.MatrixOptions
                      .quantileBinningInfoText
                  }
                  title={
                    localization.ErrorAnalysis.MatrixOptions
                      .quantileBinningTitle
                  }
                />
              </div>
            }
            onText={localization.ErrorAnalysis.MatrixOptions.toggleOnLabel}
            offText={localization.ErrorAnalysis.MatrixOptions.toggleOffLabel}
            onChange={this.onBinningToggleChange}
            styles={{ label: { padding: 0 }, root: { padding: 0 } }}
            disabled={!this.props.isEnabled}
          />
        </Stack.Item>
        <Stack.Item className={classNames.sliderStackStyle}>
          <Label className={classNames.sliderLabelStyle}>
            {localization.ErrorAnalysis.MatrixOptions.binningThresholdLabel}
            <InfoCallout
              iconId={this._binningThresholdIconId}
              infoText={
                localization.ErrorAnalysis.MatrixOptions
                  .binningThresholdInfoText
              }
              title={
                localization.ErrorAnalysis.MatrixOptions.binningThresholdTitle
              }
            />
          </Label>
          <Slider
            min={2}
            max={20}
            defaultValue={8}
            showValue
            onChanged={this.onBinsSliderChanged}
            disabled={!this.props.isEnabled}
          />
        </Stack.Item>
      </Stack>
    );
  }

  private onBinningToggleChange = (
    _: React.MouseEvent<HTMLElement>,
    checked?: boolean
  ): void => {
    if (checked !== undefined) {
      this.props.updateQuantileBinning(checked);
    }
  };

  private onBinsSliderChanged = (
    _: MouseEvent | TouchEvent | KeyboardEvent,
    value: number
  ): void => {
    this.props.updateNumBins(value);
  };
}
