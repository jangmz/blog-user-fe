import { formatDateEU } from "../../Utility/formatDate"

export default function AllAuthorPosts({ authorPosts, handleDelete, handleEdit }) {

    return (
        <>
            {
                authorPosts.length > 0 
                ? 
                <table className="table text-center">
                    <thead>
                        <td scope="col"><strong>Title</strong></td>
                        <td scope="col"><strong>Created</strong></td>
                        <td scope="col"><strong>Updated</strong></td>
                        <td scope="col"><strong>Published/Unpublished</strong></td>
                        <td scope="col"><strong>Action</strong></td>
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
                                    <td>
                                        <div className="d-flex justify-content-center gap-3">
                                            <button type="button" className="btn btn-outline-info btn-sm" onClick={() => handleEdit(post.id)}>Edit</button>
                                            <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(post.id)}>Delete</button>
                                        </div>
                                        
                                    </td>
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