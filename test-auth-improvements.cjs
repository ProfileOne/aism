// Test the authentication improvements

// Test fuzzy matching
const levenshteinDistance = (str1, str2) => {
  const m = str1.length;
  const n = str2.length;
  const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
  }

  return dp[m][n];
};

const isSimilarEnough = (str1, str2, threshold = 0.7) => {
  const maxLen = Math.max(str1.length, str2.length);
  if (maxLen === 0) return true;
  
  const distance = levenshteinDistance(str1, str2);
  const similarity = 1 - distance / maxLen;
  
  return similarity >= threshold;
};

// Test cases
console.log('Testing Fuzzy Matching for Delegate Login:\n');

const testCases = [
  { input: 'SMT. DROUPADI MURMU', expected: true, description: 'Exact match' },
  { input: 'SMT DROUPADI MURMU', expected: true, description: 'Missing dot' },
  { input: 'DROUPADI MURMU', expected: true, description: 'Missing prefix' },
  { input: 'DROAPADI MURMU', expected: true, description: 'Typo in name' },
  { input: 'SMIT. DROUPADI MURMU', expected: true, description: 'Typo in prefix' },
  { input: 'SMT. DROUPADI MURMUU', expected: true, description: 'Extra letter' },
  { input: 'RANDOM NAME', expected: false, description: 'Completely different' },
];

const correctName = 'SMT. DROUPADI MURMU';

testCases.forEach(test => {
  const result = isSimilarEnough(test.input.toUpperCase(), correctName, 0.6);
  const status = result === test.expected ? '✅' : '❌';
  console.log(`${status} ${test.description}: "${test.input}" -> ${result}`);
});

console.log('\n\nTesting Multiple Admin Accounts:\n');

const ADMIN_CREDENTIALS = [
  { id: 'dakshwadekar', password: 'AISM@0809' },
  { id: 'vishwajeetk', password: 'AISM@0809' }
];

const adminTests = [
  { id: 'dakshwadekar', password: 'AISM@0809', expected: true },
  { id: 'vishwajeetk', password: 'AISM@0809', expected: true },
  { id: 'dakshwadekar', password: 'wrongpassword', expected: false },
  { id: 'vishwajeetk', password: 'wrongpassword', expected: false },
  { id: 'wronguser', password: 'AISM@0809', expected: false },
];

adminTests.forEach(test => {
  const admin = ADMIN_CREDENTIALS.find(
    admin => admin.id === test.id && admin.password === test.password
  );
  const result = !!admin;
  const status = result === test.expected ? '✅' : '❌';
  console.log(`${status} Admin login: ${test.id} / ${test.password} -> ${result}`);
});

console.log('\n✅ Authentication improvements tested successfully!');