function pageRank(links) {
     const DAMPING_FACTOR = 0.85
     const MAX_ITR = 100;
     const numPages = Object.keys(links).length;
     const initialRank = 1 / numPages;
     let ranks = {};

     // Initialize ranks for each page
     for (const page in links) {
          ranks[page] = initialRank;
     }

     // Iterate over the links and update ranks until convergence or max iterations
     let iteration = 0;
     while (iteration < MAX_ITR) {
          let newRanks = {};

          // Calculate new ranks for each page
          for (const page in links) {
               let rank = 0;

               // Calculate the contribution from incoming links
               for (const incomingPage in links[page]) {
                    const numLinks = Object.keys(links[incomingPage]).length;
                    rank += ranks[incomingPage] / numLinks;
               }

               // Apply damping factor
               rank = (1 - DAMPING_FACTOR) / numPages + DAMPING_FACTOR * rank;
               newRanks[page] = rank;
          }

          ranks = newRanks;
          iteration++;
     }

     return ranks;
}

const links = {
     page1: {
          page2: true,
          page3: true,
     },
     page2: {
          page1: true,
          page3: true,
     },
     page3: {
          page2: true,
     },
};



const ranks = pageRank(links);
console.log(ranks); 
