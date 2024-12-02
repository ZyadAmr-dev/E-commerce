import { Client } from '@elastic/elasticsearch';

const elasticClient = new Client({ 
    node: 'http://127.0.0.1:9200',
    auth: {
        username: 'elastic', 
        password: '573420'
    } 
});

class SearchOnProductService {
    public static async indexDocument(product){
        try {
            const res = await elasticClient.index({
                index: "products",
                document: product 
            })
            console.log('doc indexed')
            return res
        } catch(err) {
            console.error('Error indexing document:', err);
            throw new Error('Failed to index document');
        }
    }

    public static async searchDocuments(title, description) {
        try {
            const body = await elasticClient.search({
                index: 'products',
                query: {
                    bool: {
                        must: [
                            { match: { title: title } },
                            { match: { description: description } }
                        ]
                    }
                }
            });
            console.log('Search results:', body.hits.hits);
            return body.hits.hits;
        } catch (error) {
            console.error('Error searching documents:', error);
            throw new Error('Failed to search documents');
        }
    }    

    public static async deleteDocument(id: string) {
        try {
            const response = await elasticClient.delete({
                index: 'products',
                id: id
            });
            console.log('Document deleted:', response);
            return response;
        } catch (error) {
            console.error('Error deleting document:', error);
            throw new Error('Failed to delete document');
        }
    }    
}

export default SearchOnProductService