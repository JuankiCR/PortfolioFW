import { useState, useEffect } from 'react';
import { databases, DATABASE_ID, COLLECTIONS } from '../../Appwrite.config';
import { Query } from 'appwrite';

export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await databases.listDocuments(
          DATABASE_ID,
          COLLECTIONS.PROJECTS,
          [
            Query.equal('is_active', true),
            Query.orderDesc('relevance'),
            Query.limit(100)
          ]
        );

        const transformedProjects = response.documents.map(doc => ({
          _id: doc.$id,
          name: doc.name || 'Untitled Project',
          description: doc.description || '',
          picture: doc.picture || '',
          link: doc.link || '',
          relevance: doc.relevance || 0,
          stack: doc.stack || [],
          createdAt: doc.$createdAt,
          updatedAt: doc.$updatedAt,
        }));

        setProjects(transformedProjects);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError(err.message || 'Failed to load projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return { projects, loading, error };
};