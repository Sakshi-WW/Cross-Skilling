import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { stockAPI, commentAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { toast } from "react-toastify";


// Built-in SVG Icon Components (No external dependencies needed)
const EditIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="18" 
    height="18" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
  </svg>
);

const DeleteIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="18" 
    height="18" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    <line x1="10" y1="11" x2="10" y2="17"></line>
    <line x1="14" y1="11" x2="14" y2="17"></line>
  </svg>
);

const StockDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [stock, setStock] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [commentForm, setCommentForm] = useState({ title: '', content: '' });
  const [submitting, setSubmitting] = useState(false);
  const [commentMessage, setCommentMessage] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', content: '' });

  // DEBUG: Log user info
  useEffect(() => {
    console.log('🔍 DEBUG INFO:');
    console.log('isAuthenticated:', isAuthenticated);
    console.log('user object:', user);
    console.log('user.username:', user?.username);
  }, [isAuthenticated, user]);

  useEffect(() => {
    fetchStockDetail();
  }, [id]);

  const fetchStockDetail = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await stockAPI.getById(id);
      setStock(response.data);
      
      // DEBUG: Log comments
      console.log('📝 Comments:', response.data.comments);
      response.data.comments?.forEach(comment => {
        console.log(`Comment by: "${comment.creadtedBy}"`);
      });
    } catch (err) {
      setError('Failed to load stock details');
      console.error(err);
    }
    setLoading(false);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (commentForm.content.length < 50 || commentForm.content.length > 500) {
      setCommentMessage('Content must be between 50 and 500 characters');
      return;
    }

    setSubmitting(true);
    setCommentMessage('');
    try {
      await commentAPI.create(id, commentForm);
      setCommentMessage('Comment posted successfully!');
      setCommentForm({ title: '', content: '' });
      fetchStockDetail(); // Refresh to show new comment
    } catch (err) {
      toast.error(err.response?.data || 'Failed to post comment');
    }
    setSubmitting(false);
  };

  const handleEditClick = (comment) => {
    setEditingCommentId(comment.id);
    setEditForm({ title: comment.title, content: comment.content });
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditForm({ title: '', content: '' });
  };

  const handleUpdateComment = async (commentId) => {
    if (editForm.content.length < 50 || editForm.content.length > 500) {
      toast.error('Content must be between 50 and 500 characters');
      return;
    }

    try {
      await commentAPI.update(commentId, editForm);
      setEditingCommentId(null);
      setEditForm({ title: '', content: '' });
      fetchStockDetail(); 
    } catch (err) {
      toast.error(err.response?.data || 'Failed to update comment');
    }
  };

const handleDeleteComment = async (commentId) => {
  try {
    await commentAPI.delete(commentId);
    fetchStockDetail();
    toast.success("Comment deleted successfully");
  } catch (err) {
    toast.error(err.response?.data || "Failed to delete comment");
  }
};

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin h-10 w-10 border-2 border-gray-300 border-t-primary-600"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error || !stock) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg">{error || 'Stock not found'}</p>
          <button
            onClick={() => navigate('/stocks')}
            className="mt-4 px-6 py-2 bg-primary-600 text-white hover:bg-primary-700"
          >
            Back to Stocks
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate('/stocks')}
          className="mb-4 text-primary-600 hover:text-primary-700 font-medium"
        >
          ← Back to Stocks
        </button>

        {/* Stock Details Card */}
        <div className="bg-white border border-gray-200 p-8 mb-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{stock.symbol}</h1>
              <h2 className="text-xl text-gray-600">{stock.company}</h2>
            </div>
            <span className="inline-flex items-center px-3 py-1 text-sm font-medium bg-primary-50 text-primary-700 border border-primary-200">
              {stock.industry}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-primary-50 border border-primary-200 p-5">
              <p className="text-sm text-gray-600 mb-1">Purchase Price</p>
              <p className="text-2xl font-bold text-primary-700">${stock.purchase?.toFixed(2)}</p>
            </div>
            <div className="bg-primary-50 border border-primary-200 p-5">
              <p className="text-sm text-gray-600 mb-1">Last Dividend</p>
              <p className="text-2xl font-bold text-primary-700">${stock.lastDiv?.toFixed(2)}</p>
            </div>
            <div className="bg-gray-100 border border-gray-300 p-5">
              <p className="text-sm text-gray-600 mb-1">Market Cap</p>
              <p className="text-2xl font-bold text-gray-900">
                ${(stock.marketCap / 1000000000).toFixed(2)}B
              </p>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-white border border-gray-200 p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Comments</h3>

          {/* Comment Form */}
          {isAuthenticated ? (
            <form onSubmit={handleCommentSubmit} className="mb-8 bg-gray-50 border border-gray-200 p-6">
              <h4 className="text-base font-semibold text-gray-900 mb-4">Add a Comment</h4>
              
              {commentMessage && (
                <div className={`mb-4 p-3 ${
                  commentMessage.includes('Failed') || commentMessage.includes('must be')
                    ? 'bg-red-100 text-red-700 border border-red-300'
                    : 'bg-blue-100 text-blue-700 border border-blue-300'
                }`}>
                  {commentMessage}
                </div>
              )}

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={commentForm.title}
                  onChange={(e) => setCommentForm({ ...commentForm, title: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter comment title"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content (50-500 characters)
                </label>
                <textarea
                  value={commentForm.content}
                  onChange={(e) => setCommentForm({ ...commentForm, content: e.target.value })}
                  required
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Share your thoughts..."
                />
                <p className="text-sm text-gray-500 mt-1">
                  {commentForm.content.length}/500 characters
                </p>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 font-medium disabled:opacity-50"
              >
                {submitting ? 'Posting...' : 'Post Comment'}
              </button>
            </form>
          ) : (
            <div className="mb-8 bg-blue-50 border border-blue-300 p-5 text-center">
              <p className="text-blue-800">
                Please{' '}
                <button
                  onClick={() => navigate('/login')}
                  className="font-semibold underline hover:text-blue-600"
                >
                  log in
                </button>
                {' '}to post comments
              </p>
            </div>
          )}

          {/* Comments List */}
          <div className="space-y-4">
            {stock.comments && stock.comments.length > 0 ? (
              stock.comments.map((comment) => {
                // DEBUG: Check ownership for each comment
                const isOwner = isAuthenticated && user?.username === comment.creadtedBy;
                console.log(`Comment "${comment.title}": isOwner = ${isOwner}, user.username = "${user?.username}", comment.creadtedBy = "${comment.creadtedBy}"`);
                
                return (
                  <div key={comment.id} className="border border-gray-200 p-5">
                    {editingCommentId === comment.id ? (
                      // Edit Mode
                      <div>
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Title
                          </label>
                          <input
                            type="text"
                            value={editForm.title}
                            onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Content (50-500 characters)
                          </label>
                          <textarea
                            value={editForm.content}
                            onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                            rows="4"
                            className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                          />
                          <p className="text-sm text-gray-500 mt-1">
                            {editForm.content.length}/500 characters
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleUpdateComment(comment.id)}
                            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 text-sm font-medium"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 text-sm font-medium"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      // View Mode
                      <>
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="text-base font-semibold text-gray-900">{comment.title}</h5>
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-500">
                              {new Date(comment.createdOn).toLocaleDateString()}
                            </span>
                            
                            {/* ALWAYS SHOW ICONS FOR TESTING - REMOVE THIS LATER */}
                            <div className="flex gap-2">
                              {/* Edit Icon Button */}
                              <button
                                onClick={() => handleEditClick(comment)}
                                className="text-blue-600 hover:text-blue-800 transition-colors p-1.5 hover:bg-blue-50 rounded"
                                title="Edit comment"
                                aria-label="Edit comment"
                              >
                                <EditIcon />
                              </button>
                              
                              {/* Delete Icon Button */}
                              <button
                                onClick={() => handleDeleteComment(comment.id)}
                                className="text-red-600 hover:text-red-800 transition-colors p-1.5 hover:bg-red-50 rounded"
                                title="Delete comment"
                                aria-label="Delete comment"
                              >
                                <DeleteIcon />
                              </button>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-700 mb-2">{comment.content}</p>
                        <p className="text-sm text-gray-500">By: {comment.creadtedBy}</p>
                      </>
                    )}
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500 text-center py-8">
                No comments yet. Be the first to comment!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockDetail;