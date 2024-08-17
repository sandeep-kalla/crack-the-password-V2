const decodePassword = (saltedPassword) => {
  const mapping = {
    'T:)C|-|$|_|tt!:)': 'TECHSHUTTLE',
    'M1N': 'WIN',
    'D()M': 'DOW',
    '_|1N|_|><': 'LINUX',
    '()$': 'OS',
    '_|6|_|N': 'UBUN',
    'T|_|##': 'TUHH',
    'R:)D': 'RED',
    '-|@t': 'HAT',
    '|~- :)D': 'FED',
    '()R@()': 'ORA',
    'D:)6': 'DEB',
    '1@N': 'IAN',
    'R@$P': 'RASP',
    '6:)RR>-()': 'BERRYOS',
    '|-||_|@': 'HUA',
    'M1:)': 'WIE',
    '6!@C|<': 'BLACK',
    '@RC|-|': 'ARCH',
    '$|<()!:)': 'SKOLE',
    '!1N|_|><': 'LINUX',
  };

  let decryptedPassword = '';
  let tempPassword = saltedPassword.trim();

  while (tempPassword.length > 0) {
    let matched = false;

    // Iterate over the mapping keys
    for (const [encryptedSegment, decryptedSegment] of Object.entries(mapping)) {
      // Check if tempPassword starts with the encrypted segment
      if (tempPassword.startsWith(encryptedSegment)) {
        decryptedPassword += decryptedSegment;  // Append the decoded segment
        tempPassword = tempPassword.slice(encryptedSegment.length).trim();  // Remove the matched part
        matched = true;
        break;  // Break the loop once a match is found
      }
    }

    // If no matching segment was found, skip the current character and continue
    if (!matched) {
      tempPassword = tempPassword.slice(1);  // Remove the first character (or move forward)
    }
  }

  return decryptedPassword;
};

// Testing with the provided cases
const encryptedPassword1 = "R:)D T:)C|-|$|_|tt!:) -|@t";
const encryptedPassword2 = "R@$P T:)C|-|$|_|tt!:) 6:)RR>-()";

console.log(decodePassword(encryptedPassword1)); // Outputs: "REDTECHSHUTTLEHAT"
console.log(decodePassword(encryptedPassword2)); // Outputs: "RASPTECHSHUTTLEBERRYOS"

export default decodePassword;
