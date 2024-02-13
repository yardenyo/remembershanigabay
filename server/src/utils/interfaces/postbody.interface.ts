interface PostBody {
    page?: number;
    resultsPerPage?: number;
    sortBy?: string;
    sortOrder?: number;
    searchKey?: string;
    searchValue?: string;
    showPastRecords?: boolean;
    filters?: {
        category: string;
        price: Array<number>;
        rating: Array<number>;
    };
}

export default PostBody;
