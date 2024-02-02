export default function FeedPost() {
    return (
        <div className="card">
            <div className="card-header">
                <div className="row">
                    <div className="col-2">
                        <img src="https://picsum.photos/200" className="rounded-circle" alt="profile-pic" />
                    </div>
                    <div className="col-10">
                        <h5 className="card-title">Username</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Date</h6>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <p className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.</p>
            </div>
        </div>
    )
}