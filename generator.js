// frequencies of starting chords:
first_chords = {'1': 0.23107136382863014,
				'4': 0.24170644751948758,
 				'5': 0.26932140914858904,
 				'6': 0.25790077950329326
}

// frequencies of chords following the current one:
next_chord = {'1': {'2': 0.07143521532880662,
  					'3': 0.007906241279880941,
  					'4': 0.3027625337177937,
  					'5': 0.44163333643382013,
  					'5/6': 0.01609152637,
  					'6': 0.1601711468700586},
 			  '2': {'1': 0.162372387,
  					'3': 0.10500729217306758,
  					'4': 0.2994652406417112,
  					'5': 0.17938745746232376,
  					'5/6': 0.013125911521633447,
  					'5/7': 0.0053475935828877,
  					'6': 0.23529411764705882},
 			  '3': {'1': 0.023,
 			  		'2': 0.07,
 			  		'4': 0.539,
 			  		'5': 0.101,
 			  		'6': 0.267},
 			  '4': {'1': 0.4155940594059406,
  					'2': 0.02566006600660066,
  					'3': 0.016254125412541256,
  					'5': 0.3962046204620462,
  					'5/6': 0.0023102310231023103,
  					'6': 0.14397689768976898},
 			  '5': {'1': 0.26672116527942924,
  					'2': 0.08568668252080856,
  					'3': 0.017910225921521996,
  					'4': 0.29347502972651607,
  					'5/7': 0.00022294887039239002,
  					'6': 0.3359839476813318},
 			  '5/6': {'4': 0.08771929824561403,
  					'4/6': 0.06140350877192982,
  					'6': 0.7368421052631579,
  					'6/7': 0.11403508771929824},
 			  '6': {'1': 0.1605925925925926,
  					'2': 0.05619753086419753,
  					'3': 0.0754567901234568,
  					'4': 0.38123456790123456,
  					'5': 0.3256296296296296,
  					'5/6': 0.0008888888888888889}
}

// useful lists for storing musical information:
keys_list = ['A', 'Bb', 'B', 'C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'G#']
chord_type = ['-', 'maj', 'min', 'min', 'maj', 'maj', 'min', 'dim']
translate = {'1' : 0, '2' : 2, '3' : 4, '4': 5, '5': 7, '6': 9, '7': 11} // the major scale in semitones

// utility function to pick an element out of a map of weights (weighted random):
function pick(elements) {
  // generate a random number from 0 to 1:
  r = Math.random();

  // pick the number accordingly:
  for (var e in elements) {
    if (r < elements[e]) return e;
    r -= elements[e];
  }
}

function generate() {
  // get the input chord progression length:
  CHORD_PROGRESSION_LENGTH = parseInt(document.getElementById('NUM_CHORDS').value);

  // make sure the number of chords is valid:
  if (isNaN(CHORD_PROGRESSION_LENGTH) || CHORD_PROGRESSION_LENGTH < 1) {
    document.getElementById('generator_status1').style.color = 'red';
    document.getElementById('generator_status1').innerHTML = 'please enter a valid number of chords to generate!';
    document.getElementById('generator_status2').innerHTML = '';
    document.getElementById('generator_status3').innerHTML = '';

    // make the notes element invisible:
    document.getElementById('notes').style.visibility = 'hidden';
    return;
  }

  // pick the first chord:
	var cp = [pick(first_chords)];
	// pick the rest of the chords:
	for (var i = 0; i < CHORD_PROGRESSION_LENGTH-1; i++) {
	  cp.push(pick(next_chord[cp[cp.length - 1]]));
  }

  // pick the key:
  var key_index = Math.floor(Math.random() * keys_list.length);
	var key = keys_list[key_index];

  // generate the status string:
  var statusString1 = 'key: ' + key + ' major\n';
	var statusString2 = 'chord progression: ';
	for (var chord in cp) {
    chord = cp[chord];

    if (chord.includes('/')) {
      // special case, if chord is a two-part chord:
      var bothChords = chord.split('/');
      var chord_one = bothChords[0];
      var chord_two = bothChords[1];
      statusString2 += keys_list[(key_index + translate[chord_one]) % 12] + chord_type[parseInt(chord_one)] + '/';
      statusString2 += keys_list[(key_index + translate[chord_two]) % 12] + chord_type[parseInt(chord_two)] + ' ';
    } else {
      statusString2 += keys_list[(key_index + translate[chord]) % 12] + chord_type[parseInt(chord)] + ' ';
    }
  }
  var statusString3 = 'it\'s a ' + cp + ' progression!';
  // update the generator status:
  document.getElementById('generator_status1').style.color = 'black'; // reset the color to black
  document.getElementById('generator_status1').innerHTML = statusString1;
  document.getElementById('generator_status2').innerHTML = statusString2;
  document.getElementById('generator_status3').innerHTML = statusString3;

  // make the notes element visible:
  document.getElementById('notes').style.visibility = 'visible';
}
