import { formatDateEU } from "../../Utility/formatDate"

export default function AllAuthorPosts({ authorPosts, handleDelete }) {

    return (
        <>
            {
                authorPosts.length > 0 
                ? 
                <table className="table text-center">
                    <thead>
                        <th scope="col">Title</th>
                        <th scope="col">Created</th>
                        <th scope="col">Updated</th>
                        <th scope="col">Published/Unpublished</th>
                    </thead>
                    <tbody>
                        {
                            authorPosts.map((post, index) => (
                                <tr scope="row" key={index}>
                                    <td>{post.title}</td>
                                    <td>{formatDateEU(post.created)}</td>
                                    <td>{formatDateEU(post.updated)}</td>
                                    <td>
                                        {
                                            post.published
                                                ? <span className="badge rounded-pill text-bg-success">Published</span>
                                                : <span className="badge rounded-pill text-bg-danger">Unpublished</span>
                                        }
                                    </td>
                                    <td><button type="button" className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(post.id)}>Delete</button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                :
                <div className="alert alert-info" role="alert">You have no posts.</div>
            }
            
        </>
    )
}