from typing import List, Optional
from ..models.domain_models import Contractor, Tier, Urgency
from .tier_service import TierService

class MatchingService:
    
    @staticmethod
    def calculate_score(contractor: Contractor, requested_tier: Tier, urgency: Urgency) -> float:
        """
        Calculates the ranking score for a contractor based on roles.md formula:
        score = tier_score + acceptance_rate_score + review_score + distance_score + urgency_bonus
        """
        score = 0.0
        
        # 1. Tier Score
        if contractor.tier == Tier.PREMIUM:
            score += 30
        elif contractor.tier == Tier.PLUS:
            score += 20
        elif contractor.tier == Tier.BASIC:
            score += 10
            
        # 2. Acceptance Rate Score
        score += (contractor.acceptance_rate * 20)
        
        # 3. Review Score
        review_ratio = min(contractor.five_star_review_count / 100.0, 1.0)
        score += (review_ratio * 20)
        
        # 4. Distance Score (assume closer gets up to 20 points, maxing out around 20km)
        distance_points = max(0, 20 - contractor.distance_km)
        score += distance_points
        
        # 5. Urgency Bonus
        if urgency in [Urgency.HIGH, Urgency.EMERGENCY] and contractor.tier in [Tier.PREMIUM, Tier.PLUS]:
            score += 10
            
        return score

    @staticmethod
    def rank_contractors(
        contractors: List[Contractor], 
        requested_tier: Tier, 
        urgency: Urgency, 
        service_category: str
    ) -> List[Contractor]:
        """
        Filters and ranks a list of contractors.
        """
        eligible_tiers = TierService.get_eligible_contractor_tiers(requested_tier)
        
        # Filter
        eligible_contractors = [
            c for c in contractors 
            if c.is_active 
            and c.service_category == service_category
            and c.tier in eligible_tiers
        ]
        
        # Rank by score descending
        eligible_contractors.sort(
            key=lambda c: MatchingService.calculate_score(c, requested_tier, urgency), 
            reverse=True
        )
        
        return eligible_contractors

    @staticmethod
    def find_best_match(
        contractors: List[Contractor], 
        requested_tier: Tier, 
        urgency: Urgency, 
        service_category: str
    ) -> Optional[Contractor]:
        """Returns the top ranked contractor, or None if no match found."""
        ranked = MatchingService.rank_contractors(contractors, requested_tier, urgency, service_category)
        return ranked[0] if ranked else None
