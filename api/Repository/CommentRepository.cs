using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Database;
using api.Dtos.Comment;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class CommentRepository : ICommentRepository
    {
        private readonly ApplicationDBContext _context;
        public CommentRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task<List<Comment?>> GetAllAsync()
        {
            var comments = await _context.Comments.Include(comment => comment.AppUser).ToListAsync();
            return comments!;
        }
       
        public async Task<Comment?> GetByIdAsync(int id)
        {
            var comment = await _context.Comments.Include(comment => comment.AppUser).FirstOrDefaultAsync(comment => comment.Id == id);
            return comment!;
        }
        
        public async Task<Comment?> CreateAsync(Comment commentModel)
        {
            await _context.Comments.AddAsync(commentModel);
            await _context.SaveChangesAsync();

            return commentModel;
        }

        public async Task<Comment?> UpdateAsync(int id, Comment commentModel, AppUser appUser)
        {
            var existingComment = await _context.Comments.Include(comment => comment.AppUser).FirstOrDefaultAsync(comment => comment.Id == id);

            if (existingComment == null)
                return null;

            if (existingComment.AppUser.Id != appUser.Id)   
            {
                return new Comment
                {
                    Title = "Unauthorized"
                };
            }

            existingComment.Title = commentModel.Title;
            existingComment.Content = commentModel.Content;

            await _context.SaveChangesAsync();
            return existingComment;
        }

        public async Task<Comment?> DelteAsync(int id, AppUser appUser)
        {
            var comment = await _context.Comments.Include(comment => comment.AppUser).FirstOrDefaultAsync(comment => comment.Id == id);

            if (comment == null)
                return null;

            if (comment.AppUser.Id != appUser.Id)   
            {
                return new Comment
                {
                    Title = "Unauthorized"
                };
            }

            _context.Comments.Remove(comment);
            await _context.SaveChangesAsync();

            return comment;
        }

    }
}