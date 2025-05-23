import audioOnImg from '../../../assets/audioOn.png'; // Ensure you have this image in your assets folder
import audioOffImg from '../../../assets/audioOff.png';
import "./Audio.css";

import React from 'react';
import PropTypes from 'prop-types';

const ToggleAudio = ({ isAudioOn, toggleAudio }) => {
    return (
        <button className="button-icon-audio" onClick={toggleAudio}>
          <img src={isAudioOn ? audioOnImg : audioOffImg} alt="Toggle Sound" />
        </button>
    );
}
ToggleAudio.propTypes = {
  isAudioOn: PropTypes.bool.isRequired,
  toggleAudio: PropTypes.func.isRequired,
};
export default ToggleAudio;