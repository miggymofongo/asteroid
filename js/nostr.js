// Define the fetchProfileMetadata function as async
async function fetchProfileMetadata() {
    const relay = await Relay.connect('wss://notes.miguelalmodo.com');
    console.log(`connected to ${relay.url}`);

    const pubkey = 'ec965405e11a6a6186b27fa451a2ffc1396ede7883d2ea11c32fbd2c63996966'; // Set the pubkey

    // Subscribe to the profile information from the relay
    const sub = relay.subscribe([
      {
        kinds: [0], // Profile kind
        authors: [pubkey],
      }
    ], {
      onevent: (event) => {
        const profileData = JSON.parse(event.content);
        console.log(profileData);
        this.aboutText = profileData.about || 'No about info available.';
        this.profilePic = profileData.picture;
      },
      oneose: () => {
        sub.close();
      }
    });
}

// Define the fetchComments function as async
async function fetchComments() {
    const relay = await Relay.connect('wss://notes.miguelalmodo.com');
    console.log(`connected to ${relay.url}`);

    const pubkey = 'ec965405e11a6a6186b27fa451a2ffc1396ede7883d2ea11c32fbd2c63996966';
    const comments = [];

    const sub = relay.subscribe([
        {
            kinds: [1], // Nostr kind for text notes
            authors: [pubkey], // Filter by your pubkey
            limit: 10 // Fetch the last 10 notes
        }
    ], {
        onevent: (event) => {
            const noteContent = event.content; // Assuming the content is a simple text note
            comments.push(noteContent); // Add the comment to the array
            this.requestUpdate(); // Trigger re-render
        },
        oneose: () => {
            sub.close();
            this.comments = comments; // Update the component's comments property
            this.requestUpdate();
        }
    });
}
