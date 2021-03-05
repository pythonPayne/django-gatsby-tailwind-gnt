import graphene
from graphene import relay, ObjectType
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
from graphene.utils.str_converters import to_snake_case

from .models import BcvIndex, Strongs, Morphology, Word


class OrderedDjangoFilterConnectionField(DjangoFilterConnectionField):
    @classmethod
    def resolve_queryset(
        cls, connection, iterable, info, args, filtering_args, filterset_class
    ):
        qs = super().resolve_queryset(
            connection, iterable, info, args, filtering_args, filterset_class
        )
        order = args.get("orderBy", None)
        if order:
            if isinstance(order, str):
                snake_order = to_snake_case(order)
            else:
                snake_order = [to_snake_case(o) for o in order]

            # annotate counts for ordering
            for order_arg in snake_order:
                order_arg = order_arg.lstrip("-")
                annotation_name = f"annotate_{order_arg}"
                annotation_method = getattr(qs, annotation_name, None)
                if annotation_method:
                    qs = annotation_method()

            # override the default distinct parameters
            # as they might differ from the order_by params
            qs = qs.order_by(*snake_order).distinct()

        return qs


class BcvIndexNode(DjangoObjectType):
    class Meta:
        model = BcvIndex
        filter_fields = {
            'bcv': ['exact', 'in'],
            'book': ['exact', ],
            'chapter': ['exact', ],
        }
        interfaces = (relay.Node, )


class StrongsNode(DjangoObjectType):
    class Meta:
        model = Strongs
        filter_fields = {
            'strongs': ['exact', ],
        }
        interfaces = (relay.Node, )


class MorphologyNode(DjangoObjectType):
    class Meta:
        model = Morphology
        filter_fields = {
            'morphology': ['exact']
        }
        interfaces = (relay.Node, )


class WordNode(DjangoObjectType):
    class Meta:
        model = Word
        filter_fields = {
            'english': ['icontains', ],
        }
        interfaces = (relay.Node, )


class Query(graphene.ObjectType):
    allBcvindices = OrderedDjangoFilterConnectionField(
        BcvIndexNode,
        orderBy=graphene.List(of_type=graphene.String))


schema = graphene.Schema(query=Query)
