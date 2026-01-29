import { getAllPosts } from './src/app/lib/markdown/posts';

async function main() {
    console.log('--- Testing getAllPosts Exclusion ---');
    try {
        const posts = await getAllPosts();
        console.log(`Found ${posts.length} posts.`);

        const excludedPost = posts.find(p => p.title === 'Excluded Draft Post');
        if (excludedPost) {
            console.error('FAILURE: "Excluded Draft Post" was found! Directory exclusion failed.');
        } else {
            console.log('SUCCESS: "Excluded Draft Post" was NOT found.');
        }

        // Also check if the previous 'Test Draft Post' (if in root) is still there or if we should cleanup
        const rootDraft = posts.find(p => p.title === 'Test Draft Post');
        if (rootDraft && rootDraft.draft) {
            console.log('NOTE: "Test Draft Post" (root) is excluded by property filter?');
            // Logic check: I kept the property filter, so it should be excluded.
        }

    } catch (error) {
        console.error('Error during execution:', error);
    }
}

main();
