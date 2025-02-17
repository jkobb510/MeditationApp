import audioOnImg from '../../audioOn.png';
import audioOffImg from '../../audioOff.png';
import React from 'react';
import PropTypes from 'prop-types';

const ToggleAudio = ({ isAudioOn, toggleAudio }) => {
    return (
      <div className="top-right">
        <button className="button-icon" onClick={toggleAudio}>
          <img src={isAudioOn ? audioOnImg : audioOffImg} alt="Toggle Sound" width="24" height="24" />
        </button>
      </div>
    );
}
ToggleAudio.propTypes = {
  isAudioOn: PropTypes.bool.isRequired,
  toggleAudio: PropTypes.func.isRequired,
};
export default ToggleAudio;