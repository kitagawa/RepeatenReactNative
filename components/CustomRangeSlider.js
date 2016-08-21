import {MKRangeSlider, Thumb} from 'react-native-material-kit';

export default class CustomRangeSlider extends MKRangeSlider{
  // Thumbが重ならないようにoverride
  _validateMove(dx, trackOriginX, trackWidth, ref) {
    const x = dx - trackOriginX;

    const onTrack = (relX) => {
      const upperBound = relX >= trackWidth ? trackWidth : relX;
      return relX <= 0 ? 0 : upperBound;
    };

    if (!ref) {
      return {};
    }

    const lthumb = this.refs.minRange;
    const rthumb = this.refs.maxRange;

    let oRef = ref;
    let stepX = trackWidth / (this.props.max - this.props.min) * this.props.step
    let valX;
    if (oRef === lthumb) {
      valX = x >= rthumb.x - stepX ? rthumb.x - stepX : onTrack(x);
    } else if (oRef === rthumb) {
      valX = x <= lthumb.x + stepX ? lthumb.x + stepX : onTrack(x);
    }

    return { newRef: oRef, x: this._snap(valX) };
  }
}
