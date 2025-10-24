import { useState, useEffect } from 'react';
import { databases, DATABASE_ID, COLLECTIONS } from '../../Appwrite.config';
import { Query } from 'appwrite';

export const useExperience = () => {
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await databases.listDocuments(
          DATABASE_ID,
          COLLECTIONS.PROFESSIONAL_EXPERIENCE,
          [
            Query.orderDesc('start'),
            Query.limit(100)
          ]
        );

        const transformedExperience = response.documents.map(doc => ({
          id: doc.$id,
          role: doc.role || 'Position',
          company: doc.company || 'Company',
          start: doc.start || '',
          end: doc.end || null,
          location: doc.location || '',
          summary: doc.summary || '',
          bullets: doc.bullets || [],
          stack: doc.stack || [],
          link: doc.link || doc.links || [],
          linkNames: doc.linkNames || [],
          isCurrent: doc.isCurrent || (!doc.end),
          createdAt: doc.$createdAt,
          updatedAt: doc.$updatedAt,
        }));

        setExperience(transformedExperience);
      } catch (err) {
        console.error('Error fetching experience:', err);
        setError(err.message || 'Failed to load professional experience');
      } finally {
        setLoading(false);
      }
    };

    fetchExperience();
  }, []);

  return { experience, loading, error };
};