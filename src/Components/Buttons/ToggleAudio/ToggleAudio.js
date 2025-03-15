import audioOnImg from '../../../audioOn.png';
import audioOffImg from '../../../audioOff.png';
import React from 'react';
import PropTypes from 'prop-types';

const ToggleAudio = ({ isAudioOn, toggleAudio }) => {
    return (
        <button className="button-icon-audio" onClick={toggleAudio}>
          <img src={isAudioOn ? audioOnImg : audioOffImg} alt="Toggle Sound" width="19" height="19" />
        </button>
    );
}
ToggleAudio.propTypes = {
  isAudioOn: PropTypes.bool.isRequired,
  toggleAudio: PropTypes.func.isRequired,
};
export default ToggleAudio;