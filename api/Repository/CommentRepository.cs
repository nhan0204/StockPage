using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Database;
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
            var comments = await _context.Comments.ToListAsync();
            return comments!;
        }
       
        public async Task<Comment?> GetByIdAsync(int id)
        {
            var comment = await _context.Comments.FirstOrDefaultAsync(comment => comment.Id == id);
            return comment!;
        }
        
        public async Task<Comment?> CreateAsync(Comment commentModel)
        {
            await _context.Comments.AddAsync(commentModel);
            await _context.SaveChangesAsync();

            return commentModel;
        }

        public async Task<Comment?> DelteAsync(int id)
        {
            var comment = await _context.Comments.FirstOrDefaultAsync(comment => comment.Id == id);

            if (comment == null)
                return null;

            _context.Comments.Remove(comment);
            await _context.SaveChangesAsync();

            return comment;
        }
    }
}